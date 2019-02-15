
const downloadEmailAttachments = require('download-email-attachments')

const onEnd = function (result) {
  if (result.error) {
    console.log(result.error)
    return
  }
  console.log("done")
  console.log(result.latestTime)
}
 
downloadEmailAttachments({
  invalidChars: /[\-]/g, //Regex of Characters that are invalid and will be replaced by X
  account: `"${ process.argv[2] }":${ process.argv[3] }@imap.gmail.com:993`, // all options and params besides account are optional
  directory: './files',
  filenameTemplate: '{filename}',
  filenameFilter: /./,
  timeout: 3000,
  log: {warn: console.warn, debug: console.info, error: console.error, info: console.info },
  since: '2015-01-12',
  lastSyncIds: ['234', '234', '5345'], // ids already dowloaded and ignored, helpful because since is only supporting dates without time
  attachmentHandler: function (attachmentData, callback, errorCB) {
    console.log(attachmentData)
    callback()
  }
}, onEnd)





/*


const Imap = require('imap')
const inpect = require('util').inspect

const user = process.argv[2]
const password = process.argv[3]
const host = 'imap.gmail.com'
const port = 993

const inbox = new Imap({
  user,
  password,
  host,
  port,
  tls: true
})

const openInbox = callback => {
  inbox.openBox('INBOX', true, callback)
}

inbox.once('ready', () => {
  openInbox((err, box) => {
    if (err) throw err
    let f = inbox.seq.fetch('1:3', {
      bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
      struct: true
    })
    f.on('message', (msg, seqno) => {
      msg.on('body', function(stream, info) {
        var buffer = ''
        stream.on('data', function(chunk) {
          buffer += chunk.toString('utf8')
          console.log(buffer)
        })
      })
      msg.on('attachment', (stream, info) => {
        console.log(info)
      })
    })
  })
})

inbox.once('error', err => {
  console.log(err)
})

inbox.once('end', () => {
  console.log('fin')
})

inbox.connect()

*/
