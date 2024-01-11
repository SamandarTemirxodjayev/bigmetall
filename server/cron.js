const cron = require('node-cron');
const Alerts = require('./models/Alerts');

console.log('Cron job is running')

cron.schedule('*/5 * * * *', async () => {
  try {
    const threeMinutesAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    await Alerts.deleteMany({ createdAt: { $lt: threeMinutesAgo } });
    console.log("deleted all documents older than 3 minutes");
  } catch (error) {
    console.error('Error deleting documents:', error);
  }
});

process.stdin.resume();