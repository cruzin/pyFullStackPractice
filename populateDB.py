import requests
import pprint
import json
import sys
import re
import getopt

#for async
import asyncio
import aiohttp

# Db stuff
from app import db
from app.models import HelpPage
from app.helperFunctions import dbMakeHelpPage, getSlugs


## I wanted to move these  2 functions to differnt files, but it gave an error
def removeImgTags(data):
    regex = r'<img .*?>'
    p = re.compile(regex)
    text  = p.sub('', data, re.DOTALL | re.MULTILINE)
    return text

async def asynclyGetHelpPage(slug, verbose):
    if not slug:
        raise ValueError("slug must have a value") # or -1


    helpPageUrl = f"https://support.allizom.org/api/1/kb/{slug}"
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url=helpPageUrl) as resp:
                r = await resp.read()
                response = json.loads(r);
                htmlWithoutImages = removeImgTags(response["html"])
                response["html"] = htmlWithoutImages
                verbose and print(response["title"])
                return response
    except Exception as e:
        print("Unable to get url {} due to {}. {}".format(helpPageUrl, e.__class__, e))


async def main(argv):
    numSlugs = 50
    verbose = False
    delete = False

    try:
        opts, args = getopt.getopt(argv,"s:vd", ["help", "output="])
    except getopt.GetoptError:
        print('arg not recognized try -> populateDB.py -s <numberOfHelpPages> -v for verbose -d to delete all entires in db')
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print('populateDB.py -s <numberOfHelpPages> -v for verbose')
            sys.exit()
        elif opt in ("-s"):
            numSlugs = int(arg)
        elif opt in ("-v"):
            verbose = True
        elif opt in ("-d"):
            delete = True

    # #Below is the get slugs part
    verbose and print("number of HelpPages gotten")
    verbose and print(numSlugs)
    slugArray = getSlugs(numSlugs, verbose)

    ## getHelpPages asyncly
    promiseArray = await asyncio.gather(*[asynclyGetHelpPage(slug, verbose) for slug in slugArray])

    for page in promiseArray:
        verbose and print(page["title"])
        verbose and print(page["slug"])
        db.session.add(dbMakeHelpPage(page))


    db.session.commit()
    pages = HelpPage.query.all()
    verbose and print("\n----pages length {} ----\n".format(len(pages)))


    for p in pages:
       verbose and print(p.id,p.title)

    # cleanup
    if(delete):
        for p in pages:
            verbose and print("removing HelpPage")
            verbose and print(p)
            db.session.delete(p)
    db.session.commit()


if sys.version_info[0] == 3 and sys.version_info[1] >= 8 and sys.platform.startswith('win'):
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
asyncio.run(main(sys.argv[1:]))
