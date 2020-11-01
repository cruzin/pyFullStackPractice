from typing import Optional
from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from config import Config

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.orm import Session
from sqlalchemy import String
from app import db, app
from app.models import HelpPage


app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)




app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])



# # Dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


@app.get("/")
def read_root():
    pages = HelpPage.query.all()
    print(pages)
    return {"numHelpPages": len(pages)}

# @app.get("/help-page/{help_page_slug}")
# async def get_page_by_slug(help_page_slug, db: Session = Depends(get_db)):
#     return crud.get_page_by_slug(db=db, url=help_page_slug)


# def get_page_by_slug(db: Session, url: String):
#     return db.query(HelpPage).filter(HelpPage.url == url).first()
@app.get("/all-help-pages/")
def get_all_pages():
    posts = HelpPage.query.all()
    urlArray=[];
    for i in posts:
        urlArray.append(i.as_preview())

    return { "allPages": urlArray}

@app.get("/help-pages/{page}")
def get_paginated_pages(page=1, pr_page=10):
    posts = HelpPage.query.order_by(HelpPage.id.desc()).paginate(int(page),pr_page,error_out=False)
    print(posts)
    print(posts.total)
    print(posts.items)
    urlArray=[];
    for i in posts.items:
        urlArray.append(i.as_preview())

    return { "pages": urlArray}

@app.get("/help-page/{help_page_slug}")
def get_page_by_slug(help_page_slug):
    return HelpPage.query.filter(HelpPage.url == help_page_slug).first().as_dict()
