import commands
import re

def get_pid_close(port):
    status,output = commands.getstatusoutput('lsof -i:'+str(port))
    if status == 0:
        res = output.split("\n")[1]
        pid = re.findall(r'(\b[0-9]+)',res)
        print pid[0]
        close_api_serve_result,info = commands.getstatusoutput("kill -9 "+str(pid[0]))
        print 'close_api_serve_result',close_api_serve_result
        if close_api_serve_result == 0:
            print "close process is :",pid[0]
            return 1
    return 0

def run_command(command):
    status,info = commands.getstatusoutput(command)
    print command,'result is ',status
    if status == 0:
        return 1
    else:
        print command,'info faile,bcs ',info
        return 0


# update lastet code from github server.
# sync_github,s_g_output = commands.getstatusoutput('git pull origin master')
run_command('cd serve')
print 'begin sync github'
# sync_github = run_command('git pull origin master')
sync_github = 1
if sync_github == 1:
        print 'github sync success'
        # build new code
        print 'begin build new code'
        # build_code = run_command('npm run build')
        build_code = 1
        if build_code == 1:
            print 'build new code success,'
            # close static serve and api serve
            print 'begin close serve'
            # close_static = get_pid_close(80)
            close_static = 1
            close_api = get_pid_close(8081)
            if close_static == 1 and close_api == 1:
                print 'close serve success'
            else:
                print 'close serve faile'
            print 'begin restart serve'
            # restart server
            serve = run_command('node ./serve/index.js')
            static = 1
            # static = run_command('node static.js')
            if serve == 1 and static == 1:
                print 'restart serve success'
                exit(1)
            else:
                print 'restart serve faile'


# print status


