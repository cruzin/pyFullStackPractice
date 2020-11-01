import json
from app.models import HelpPage
from app.apiCalls import getSlugObj

def getSlugs(numSlugs, verbose):
    verbose and print("numSlugs in getSlugs: " + str(numSlugs))
    slugArray=[];
    i=1;
    while len(slugArray)< numSlugs:
        obj = getSlugObj(i);
        for j in obj:
            if len(slugArray)< numSlugs:
                slugArray.append(j["slug"])
        i += 1 #to avoid inf looping during dev
    return slugArray

def dbMakeHelpPage(obj):
    return HelpPage(url=obj["slug"],\
                     products=json.dumps(obj["products"]),topics=json.dumps(obj["topics"]),locale=obj["locale"],\
                      html=obj["html"], title=obj["title"], summary=obj["summary"])
