import rclpy
from rclpy.node import Node
from sensor_msgs.msg import CompressedImage

class node(Node):
    def __init__(self):
        super().__init__("snap_node")
        self.get_logger().info("Snap node has started |  Run me whenever you want to take a snap of the tree in front")
        self.subscription = self.create_subscription(
            CompressedImage,
            '/image_raw/compressed',
            self.listener_callback,
            10)
        self.pub = self.create_publisher(CompressedImage, "/image_raw/compressed/yolo2",10)
        self.shutdown_requested = False
    
    def listener_callback(self, msg):
        self.pub.publish(msg=msg)
        self.shutdown_requested = True
    
def main(args=None):
    rclpy.init(args=args)
    nd = node()

    while rclpy.ok() and not nd.shutdown_requested:
        rclpy.spin_once(nd, timeout_sec=0.1)

    rclpy.shutdown()
    nd.destroy_node()