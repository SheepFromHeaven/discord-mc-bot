from sys import stdout
from argparse import ArgumentParser

ARGS = ArgumentParser()
ARGS.add_argument('-d', '--duration', default=120, type=int)
args = vars(ARGS.parse_args())
duration = args['duration']

print('PYTHON: You asked for a server for ' + str(duration) + ' minutes')
stdout.flush()
