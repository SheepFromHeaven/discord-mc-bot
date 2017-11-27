import argparse, sys, time

parser=argparse.ArgumentParser()

parser.add_argument('-t', help='Do the time option')

args=parser.parse_args()

print vars(args)['t']
sys.stdout.flush()

time.sleep(5)

print 'test print'
