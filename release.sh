#!/bin/bash

SRCNAME=canvas3dapi
ZIPFILENAME=$SRCNAME-$1.zip
UNCZIPFILENAME=$SRCNAME-$1-uncompressed.zip

if [ $# -ne 1 -o ! -d $SRCNAME ]
then
  echo "Usage: ./release.sh releasenumber (in the canvas3d directory)"
  echo "e.g.: ./release.sh 0.5"
  exit 1	
fi

if [ -f $ZIPFILENAME ]
then
  echo "$ZIPFILENAME already exists, giving up"
  exit 1
fi

if [ -f $UNCZIPFILENAME ]
then
  echo "$UNCZIPFILENAME already exists, giving up"
  exit 1
fi

rm -rf /tmp/$SRCNAME

# don't need all the .svn files
svn export $SRCNAME /tmp/$SRCNAME
if [ $? -ne 0 ]
then
  echo "svn export failed, giving up"
  exit 1
fi

OLDDIR=`pwd`
cd /tmp

# create 'uncompressed' zip
zip -r $UNCZIPFILENAME $SRCNAME
if [ $? -ne 0 ]
then
  echo "Failed to create zip file, giving up"
  exit 1
fi

mv $UNCZIPFILENAME $OLDDIR
if [ $? -ne 0 ]
then
  echo "Something weird happened, giving up"
  exit 1
fi

cc $OLDDIR/jsmin.c -o jsmin
if [ $? -ne 0 ]
then
  echo "Failed to compile jsmin, giving up"
  exit 1
fi

# create 'compressed' (normal) zip
for NAME in `find $SRCNAME`
do
  if echo $NAME | grep -E ".js$" > /dev/null
  then
    echo "Compressing $NAME"
    ./jsmin < $NAME > $NAME.min
    mv $NAME.min $NAME
  fi
done

zip -r $ZIPFILENAME $SRCNAME
if [ $? -ne 0 ]
then
  echo "Failed to create zip file, giving up"
  exit 1
fi

mv $ZIPFILENAME $OLDDIR
if [ $? -ne 0 ]
then
  echo "Something weird happened, giving up"
  exit 1
fi

echo "Release zip files $ZIPFILENAME and $UNCZIPFILENAME created"

echo "Don't forget to look at releases/Release Commands.txt to make a branch"
