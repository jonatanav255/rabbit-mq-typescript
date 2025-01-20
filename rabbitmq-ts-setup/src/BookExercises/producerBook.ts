import amqp from 'amqplib' // Import the RabbitMQ client library

const sendMessages = async () => {
  try {
    // RabbitMQ connection URL
    const url = 'amqp://guest:guest@localhost:5672/'

    // Establish connection to RabbitMQ
    const connection = await amqp.connect(url)
    console.log('Connected to RabbitMQ')

    // Create a channel for communication
    const channel = await connection.createChannel()

    // Exchange and routing key
    const exchangeName = 'chapter2-example'
    const routingKey = 'example-routing-key'

    // Declare the exchange
    await channel.assertExchange(exchangeName, 'direct', { durable: true })

    // Send messages with properties
    for (let i = 0; i < 10; i++) {
      const messageContent = `Test message #${i}`
      const messageProperties = {
        messageId: `msg-${i}`, // Unique message ID
        timestamp: Date.now(), // Current timestamp
        contentType: 'text/plain' // Metadata for the message
      }

      // Publish the message to the exchange
      channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(messageContent), // Message body
        messageProperties // Message properties
      )

      console.log(
        `[x] Sent: ${messageContent} with properties`,
        messageProperties
      )
    }

    // Close the connection after sending messages
    setTimeout(() => {
      connection.close()
      console.log('Connection closed')
    }, 500)
  } catch (error) {
    console.error('Error sending messages:', error)
  }
}

// Execute the producer function
sendMessages()
