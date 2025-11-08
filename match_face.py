import boto3

if __name__ == "__main__":

    bucket='emotion-recognition5068'
    collectionId='Collection'
    fileName='input.JPG'
    threshold = 70
    maxFaces=2

    client = boto3.client('rekognition',region_name='us-south-1')

    response=client.search_faces_by_image(CollectionId=collectionId,
                                Image={'S3Object':{'Bucket':bucket,'Name':fileName}},
                                FaceMatchThreshold=threshold,
                                MaxFaces=maxFaces)


    faceMatches=response['FaceMatches']
    print ('Matching faces')
    for match in faceMatches:
            print ('FaceId:' + match['Face']['FaceId'])
            print ('Similarity: ' + "{:.2f}".format(match['Similarity']) + "%")
            print (match['Face']['ExternalImageId'])
