from flask import Flask
from zeep import Client

app = Flask(__name__)


@app.route('/')
def hello_world():
    print("Handling request to home page.")
    client = Client('http://127.0.0.1:8000/?wsdl')
    result = client.service.deliveryCost(100.0, 5.0)
    #client = Client('https://www.dataaccess.com/webservicesserver/NumberConversion.wso?wsdl')
    #result = client.service.NumberToWords(800)
    return result


if __name__ == '__main__':
    app.run()
