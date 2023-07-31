cd /home/star/nodejs/clientApi

file_postfix=`date +'%Y%m%d%H'`

nohup node index.js 1>>"logs/client_api_"$file_postfix".txt" 2>>"logs/client_api_"$file_postfix".txt" &
