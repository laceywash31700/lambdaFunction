# Lambda Function

This is how I started my lab 17

## Set-up

### Step one: Set Up Permissions in AWS IAM:

I had to make sure my IAM had permission to use

> - AmazonS3FullAccess
> - AWSLambda_FullAccess
>   you can do this by going to your IAM > users > {your-user-name} > Permissions > add Policy Directly(3rd option) > select permissions.

### Step two: Create Bucket in AWS s3:
Think of your bucket as a sort of database that works with objects so it's like mongoDb.

> - go to buckets > create new Bucket > give it a name > set to what public or private > add policy configs(functions for access from previous steps) > Done

### Step three: Make Lambda Function:

this will be where you code your project or task the code is gonna run like a server function but be serverless it lives in a server technically but not in the way you are used to and it is going to be event based meaning it will run when a trigger or event makes it run otherwise it will be shut off

> - give function a name > what language you want to use (if js use Node 16 as opposed to 18 I don't know the difference) > and start coding remember to use your consol logs and the built in testing debugger(its really helpful)

## Code

### Add Your Decencies

You want to add the AWS SDK for using your S3.
not sure why entirely but it is important like express

then define S3 as a constructor of AWS.S3()

Now you need to create an empty array
this array will be a JSON object that holds the image details you want to add to the bucket
