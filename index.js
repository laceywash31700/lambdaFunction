const AWS = require('aws-sdk');
const S3 = new AWS.S3();

const addImage = async (event) => {
  const s3Event = event.Records[0];
  const type = '.jpg';
  const Bucket = 'lacey-lab-17';
  const Key = 'images.json';
  let name = s3Event.s3.object.key;
  let size = s3Event.s3.object.size;
  let imagesDic = null;
  const newImage = { name, type, size };

  try {
    // validates if the event is a proper event
    _validateEvent(s3Event);

    // grabs event from bucket it should be a string
    imagesDic = await S3.getObject({ Bucket, Key }).promise();
    // parse the Json so we can manipulate it
    imagesDic = JSON.parse(imagesDic.Body.toString('utf-8'));

    // checkpoint for correct processing
    console.log('+++ images from the bucket this is a good start', imagesDic);

    //looks for existing image in array helper variable.
    const existingImage = imagesDic.find((image) => image.name === name);

    if (!existingImage) {
      // checks if image exists in array if not it filters the names that are not equal to the new image name and pushes it to the imageDic
      imagesDic.filter((val) => val.name !== name);
      imagesDic.push(newImage);

      // console checkpoint if you got it its a good thing
      console.log(
        'I am the image Dictionary this is good news, almost done',
        imagesDic
      );

      // then it deletes the duplicate image in the bucket
      await S3.deleteObject({ Bucket, Key: name }).promise();

      // then it adds updated json to the bucket with a put request
      await S3.putObject({
        Bucket,
        Key,
        Body: JSON.stringify(imagesDic),
      }).promise();

      // returns response to client that all is good
      const response = {
        statusCode: 200,
        body: 'Event processed successfully'
      };
      return response;
    }
else {
    //  tells you the image already exist
      console.log("Image with the same name already exists. Not adding it again.");
     
    // responds with a status 200 but does not do anything.
      const response = {
        statusCode: 200,
        body: "Event processed successfully",
      };
      return response;
  } 
  
  } catch (e) {
    // error handler
    console.error('Event validation or processing error:', e);
    const response = {
      statusCode: 400,
      body: 'Event was wrong'
    };
    return response;
  }
};

// helper function for validating event
function _validateEvent(event) {
  if (
    !event.Records ||
    !Array.isArray(event.Records) ||
    event.Records.length === 0
  ) {
    throw new Error('Invalid event format. Exiting.');
  }
  if (
    event.eventSource !== 'aws:s3' ||
    event.eventName !== 'ObjectCreated:Put'
  ) {
    throw new Error('Invalid event source or event name. Exiting.');
  }
}

module.exports = addImage