import amqp from 'amqplib' // Import the RabbitMQ client library

const connectToRabbitMQ = async () => {
  try {
    const url = 'amqp://guest:guest@localhost:5672/'
    const connection = await amqp.connect(url)
    console.log('Connected to RabbitMQ')

    const channel = await connection.createChannel()

    const exchangeName = 'chapter2-example'

    await channel.assertExchange(exchangeName, 'direct', { durable: true })
    console.log(`Exchange '${exchangeName}' declared`)

    const queueName = 'example';

    await channel.assertQueue(queueName, {durable: true})
    console.log(`Queue '${queueName}' declared`)

    
  } catch {}
}
connectToRabbitMQ()
