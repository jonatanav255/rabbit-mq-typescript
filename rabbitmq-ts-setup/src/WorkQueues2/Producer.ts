import amqp from 'amqplib' // Import the RabbitMQ client library

const sendTasksWithRouting = async () => {
  try {
    const url = 'amqp://guest:guest@localhost:5672/'
    const connection = await amqp.connect(url)
    console.log('Connected to RabbitMQ')

    const channel = await connection.createChannel()

    // Declare the exchange
    const exchangeName = 'task_exchange'
    await channel.assertExchange(exchangeName, 'direct', { durable: true }) // 'direct' exchange type
    console.log(`Exchange '${exchangeName}' declared`)

    // Define tasks with routing keys
    const tasks = [
      { routingKey: 'high_priority', content: 'High priority task' },
      { routingKey: 'low_priority', content: 'Low priority task' },
      { routingKey: 'medium_priority', content: 'Medium priority task' }
    ]

    // Send tasks to the exchange with routing keys
    tasks.forEach(task => {
      channel.publish(
        exchangeName,
        task.routingKey, // Routing key determines the message type
        Buffer.from(task.content),
        { persistent: true }
      )
      console.log(
        `[x] Sent: ${task.content} with routing key: ${task.routingKey}`
      )
    })

    setTimeout(() => {
      connection.close()
      console.log('Connection closed')
    }, 500)
  } catch (error) {
    console.error('Error sending tasks:', error)
  }
}

sendTasksWithRouting()
