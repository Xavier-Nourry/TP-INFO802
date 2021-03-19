import logging
logging.basicConfig(level=logging.DEBUG)
from spyne import Application, rpc, ServiceBase, \
Integer, Unicode, Float # TODO : enlever imports inutiles
from spyne import Iterable
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication

class DeliveryCostsService(ServiceBase):
    @rpc(Float, Float, _returns=Float)
    def deliveryCost(ctx, distance, weight):
        return distance * weight / 100 # TODO : voir si calcul plus réaliste
        

application = Application([DeliveryCostsService],
    tns='DeliveryCosts_SOAP-Service', # TODO : voir utilité
    in_protocol=Soap11(validator='lxml'),
    out_protocol=Soap11()
)

if __name__ == '__main__':
    # You can use any Wsgi server. Here, we chose
    # Python's built-in wsgi server but you're not
    # supposed to use it in production.
    from wsgiref.simple_server import make_server
    wsgi_app = WsgiApplication(application)
    server = make_server('127.0.0.1', 8000, wsgi_app)
    server.serve_forever()