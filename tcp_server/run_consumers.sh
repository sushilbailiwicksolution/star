cd /home/star/nodejs/tcp_server

file_postfix=`date +'%Y%m%d%H'`


nohup node consumer_hb.js 1>>"logs/consumer_HB_"$file_postfix".txt" 2>>"logs/consumer_HB_"$file_postfix".txt" &
nohup node consumer_tw.js 1>>"logs/consumer_TW_"$file_postfix".txt" 2>>"logs/consumer_TW_"$file_postfix".txt" &
nohup node consumer_pa.js 1>>"logs/consumer_PA_"$file_postfix".txt" 2>>"logs/consumer_PA_"$file_postfix".txt" &
nohup node consumer_al.js 1>>"logs/consumer_AL_"$file_postfix".txt" 2>>"logs/consumer_AL_"$file_postfix".txt" &

