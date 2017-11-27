import sys
import time
from argparse import ArgumentParser

ARGS = ArgumentParser()
ARGS.add_argument('-d', '--duration', default=120, type=int)
args = vars(ARGS.parse_args())
duration = args['duration']

print duration
sys.stdout.flush()

time.sleep(5)

print 'test print'
