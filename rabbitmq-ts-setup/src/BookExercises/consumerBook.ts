import amqp from 'amqplib' // Import the RabbitMQ client library

const connectToRabbitMQ = async () => {
  try {
    // RabbitMQ connection URL
    const url = 'amqp://guest:guest@localhost:5672/'

    // Establish connection to RabbitMQ
    const connection = await amqp.connect(url)
    console.log('Connected to RabbitMQ')

    // Create a channel for communication
    const channel = await connection.createChannel()

    // Declare the exchange
    const exchangeName = 'chapter2-example'
    await channel.assertExchange(exchangeName, 'direct', { durable: true })
    console.log(`Exchange '${exchangeName}' declared`)

    // Declare the queue
    const queueName = 'example'
    await channel.assertQueue(queueName, { durable: true })
    console.log(`Queue '${queueName}' declared`)

    // Bind the queue to the exchange with a routing key
    const routingKey = 'example-routing-key'
    await channel.bindQueue(queueName, exchangeName, routingKey)
    console.log(
      `Queue '${queueName}' bound to exchange '${exchangeName}' with routing key '${routingKey}'`
    )

    // Optional: Close the connection after a delay
    setTimeout(() => {
      connection.close()
      console.log('Connection closed')
    }, 500)
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error)
  }
}

// Execute the connection setup
connectToRabbitMQ()
