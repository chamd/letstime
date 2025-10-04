#!/bin/bash
VERSION_FILE="./version.json"
DATE=$(date +'%y.%m.%d')

if [ ! -f "$VERSION_FILE" ]; then
  echo "{\"date\":\"$DATE\",\"count\":1}" > "$VERSION_FILE"
else
  CURRENT_DATE=$(grep -o '"date":"[^"]*' $VERSION_FILE | cut -d'"' -f4)
  CURRENT_COUNT=$(grep -o '"count":[0-9]*' $VERSION_FILE | cut -d':' -f2)

  if [ "$CURRENT_DATE" == "$DATE" ]; then
    NEW_COUNT=$((CURRENT_COUNT + 1))
  else
    NEW_COUNT=1
  fi

  echo "{\"date\":\"$DATE\",\"count\":$NEW_COUNT}" > "$VERSION_FILE"
fi

echo "✅ Version updated to $DATE.$NEW_COUNT"
