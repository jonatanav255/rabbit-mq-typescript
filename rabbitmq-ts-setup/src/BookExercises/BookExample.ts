import amqp from 'amqplib' // Import the RabbitMQ client library

const connectToRabbitMQ = async () => {
  try {
    const url = 'amqp://guest:guest@localhost:5672/'
    const connection  = await amqp.connect(url)
    
  } catch {}
}
