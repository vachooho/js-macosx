#!/bin/sh
echo on
pushd ./$1
target="../"$1".xpi"
rm -rf ${target}
# zip everything except hidden .svn/.DS_Store/etc files
zip -9 -r ${target} $(find * -not -regex '.*/\..*')
popd
