cd /home/star/nodejs/tcp_server

file_postfix=`date +'%Y%m%d%H'`

nohup node tcpserver.js 1>>"logs/tcp_out_"$file_postfix".txt" 2>>"logs/tcp_out_"$file_postfix".txt" &
