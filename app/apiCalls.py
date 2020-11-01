import requests
import json

import asyncio
import aiohttp

from app.models import HelpPage

def getSlugObj(n=1):
    url ='https://support.allizom.org/api/1/kb/' + ( "" if n < 2 else "?page="+str(n))
    r=requests.get(url)
    obj = json.loads(r.text)["results"]
    return obj

## the non async get function, no longer in use
# def getHelpPage(slug):
#     if not slug:
#         raise ValueError("slug must have a value") # or -1
#
#     helpPageUrl = f"https://support.allizom.org/api/1/kb/{slug}"
#     r =requests.get(helpPageUrl)
#     response = json.loads(r.text);
#     htmlWithoutImages = removeImgTags(response["html"])
#     response["html"] = htmlWithoutImages
#     return response
