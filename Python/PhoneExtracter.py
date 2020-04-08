# copyright 2017 jinyaoMa

from urllib import request as req
import re

class PhoneExtracter(object):
  __phoneRegex = []
  __url = []

  '''
  # Initialize PhoneExtracter
  # @param urlAddress - web address e.g "http://www.bilibili.com/html/contact.html"
  # @param phoneFormat - list of regular expressions for phone number searching e.g ["\d{3}-\d{3}-\d{4}", "\(\d{3}\) *\d{3}-\d{4}"]
  '''
  def __init__(self, urlAddress=["http://www.bilibili.com/html/contact.html", "https://www.mohawkcollege.ca/about-mohawk/contact-mohawk"],
               phoneFormat=["\d{3}-\d{3}-\d{4}", "\(\d{3}\) *\d{3}-\d{4}"]):
    self.__url = urlAddress
    self.__phoneRegex = phoneFormat

  '''
  # Extract a list of phone numbers that match the regex
  # @return listOfPhones - list of phone numbers
  '''
  def extract(self):
    listOfPhones = {}
    for urlAddr in self.__url:
      cnt = req.Request(urlAddr)
      page = req.urlopen(cnt)
      data = page.read().decode("utf-8")
      tempList = {urlAddr: []}
      for phoneFormat in self.__phoneRegex:
        tempList[urlAddr].extend(re.findall(phoneFormat, data))
      listOfPhones.update(tempList)
    return listOfPhones