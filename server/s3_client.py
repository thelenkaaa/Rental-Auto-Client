import boto3

ACCESS_KEY = 'AKIA4T6F6MQ357AYKV3G'
SECRET_KEY = '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'
BUCKET_NAME = 'rental-service-bucket'

s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)

# list all buckets to confirm connection is successful
response = s3.list_buckets()
for bucket in response['Buckets']:
    print(f'{bucket["Name"]}')

key = 'images/image1.jpeg'
download_path = './images/image1.jpeg'

s3.download_file(BUCKET_NAME, key, download_path)

if __name__ == '__main__':
    pass
