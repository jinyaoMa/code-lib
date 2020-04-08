# copyright 2017 jinyaoMa

from PIL import Image, ImageDraw, ImageFont, ImageFilter

import random
import string

class VCodeGenerator(object):
  __strHexMaxClrOfFont = 0xffffff
  __strHexMinClrOfFont = 0x999999
  __strHexMaxClrOfBg = 0xcccccc
  __strHexMinClrOfBg = 0x333333
  __imgVerificationCode = Image.Image
  __intHeight = 0
  __intWidth = 0
  __intNumOfChars = 0
  __strFontPath = ""
  __dblFontSize = 0.75
  
  '''
  # Initialize VCodeGenerator
  # @param fontPath - path of font file e.g 'C:\Windows\Fonts\Arial.ttf'
  # @param numOfChar - number of characters to be generated e.g 4
  # @param height - height of verification code image e.g. 64
  '''
  def __init__(self, fontPath='C:\Windows\Fonts\Arial.ttf', numOfChars=4, height=64):
    self.__strFontPath = fontPath
    self.__intNumOfChars = numOfChars
    self.__intHeight = height
    self.__intWidth = height * numOfChars
    self.__imgVerificationCode = Image.new('RGB', (self.__intWidth, self.__intHeight), "#" + hex(self.__strHexMaxClrOfBg)[2:])
      
  '''
  # Set Font Size
  # @param fontSize - decimal/precentage due to image height e.g. 0.5
  '''
  def setFontSize(self, fontSize):
    if (fontSize > 1.0):
      return -1
    self.__dblFontSize = fontSize
      
  '''
  # Get Font Size
  '''
  def getFontSize(self):
    return self.__dblFontSize

  '''
  # Generate a random character include letters & digits
  '''
  def __generateRandChar(self):
    finalChar = random.randint(0, 1)
    if (finalChar):
      finalChar = str(random.randint(0, 9))
    else:
      finalChar = random.choice(string.ascii_letters)
    return finalChar

  '''
  # Generate a random background color
  '''
  def __generateRandBgColor(self):
    return (random.randint(self.__strHexMinClrOfBg, self.__strHexMaxClrOfBg))

  '''
  # Generate a random font color
  '''
  def __generateRandFontColor(self):
    return (random.randint(self.__strHexMinClrOfFont, self.__strHexMaxClrOfFont))

  '''
  # Generate final verification code image
  # @return code - codes to verify
  '''
  def generate(self):
    code = ""
    marginBetweenChar = self.__intHeight * (1 - self.__dblFontSize)
    imgfntFont = ImageFont.truetype(self.__strFontPath, int(self.__intHeight * self.__dblFontSize))
    imgdrwDraw = ImageDraw.Draw(self.__imgVerificationCode)
    for x in range(self.__intWidth):
      for y in range(self.__intHeight):
        imgdrwDraw.point((x, y), fill = self.__generateRandBgColor())
    for s in range(self.__intNumOfChars):
      strRanChar = self.__generateRandChar()
      imgdrwDraw.text((self.__intHeight * s + marginBetweenChar, marginBetweenChar / 2), strRanChar, font = imgfntFont, fill = self.__generateRandFontColor())
      code += strRanChar
    self.__imgVerificationCode = self.__imgVerificationCode.filter(ImageFilter.BLUR)
    self.__imgVerificationCode.save('code.jpg', 'jpeg')
    return code