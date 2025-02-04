import amqp from 'amqplib' // Import the RabbitMQ client library

const sendTasks = async () => {
  try {
    const url = 'amqp://guest:guest@localhost:5672/'

    const connection = await amqp.connect(url)
    console.log('Connected to RabbitMQ')

    const channel = await connection.createChannel()

    const queueName = 'work_queue'
    await channel.assertQueue(queueName, { durable: true })
    console.log(`Queue '${queueName}' declared`)

    for (let i = 0; i < 10; i++) {
      const task = `Task ${i}`
      channel.sendToQueue(queueName, Buffer.from(task), { persistent: true })

      console.log(`[x] Sent: ${task}`)
    }

    setTimeout(() => {
      connection.close()
      console.log('Connection closed')
    }, 500)
  } catch (error) {
    console.error('Error sending tasks:', error)
  }
}

sendTasks()
