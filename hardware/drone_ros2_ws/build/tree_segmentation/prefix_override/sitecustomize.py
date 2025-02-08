import sys
if sys.prefix == '/usr':
    sys.real_prefix = sys.prefix
    sys.prefix = sys.exec_prefix = '/home/rogue/Desktop/hackcbs/orchardeyes/install/tree_segmentation'
