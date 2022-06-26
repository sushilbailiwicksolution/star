cd /home/star/nodejs/reportApi

file_postfix=`date +'%Y%m%d%H'`

nohup node report.js 1>>"logs/report_api_"$file_postfix".txt" 2>>"logs/report_api_"$file_postfix".txt" &
