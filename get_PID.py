import commands
import re
status,output = commands.getstatusoutput('lsof -i:8081')
# print status
if status == 0:
#	print output
	res = output.split("\n")[1]
	pid = re.findall(r'(\b[0-9]+)',res)
	print pid[0]
	commands.getstatusoutput("kill -9 ",pid[0])
