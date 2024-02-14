#!/bin/sh

PROCESSNAME="nestJsBackend"
PROCESSPID="nestJsBackend"

start_process(){
	echo "Starting process: $PROCESSNAME"

	if [ ! -f $PROCESSPID ]; then
		nohup node main.js "nestJsBackend" 1>log.txt 2>>log.txt &
		echo $! > $PROCESSPID
		echo "$PROCESSNAME started!"
	else
		echo "$PROCESSNAME is already running..."
	fi
}

stop_process(){
	if [ -f $PROCESSPID ]; then
		PID=$(cat $PROCESSPID)
		echo "Stopping $PROCESSNAME..."
		kill $PID;
		echo "$PROCESSNAME stopped!"
		rm $PROCESSPID
	else
		echo "$PROCESSNAME is not running...."
	fi
}

case $1 in
	start)
		start_process
	;;

	stop)
		stop_process
	;;

	restart)
		stop_process
		start_process
		;;
	*)
		echo "Select an option start/stop/restart for the service"
	;;

esac
