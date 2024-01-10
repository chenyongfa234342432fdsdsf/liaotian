import { awsS3Config } from '@/helper/env'
import { awsS3Client } from '@/plugins/aws-s3'
import { AwsS3FolderModuleName, AwsS3FolderModuleUseCaseName, awsS3AccessableFolder } from '@/plugins/aws-s3/constants'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { t } from '@lingui/macro'

const getAwsS3FileRelativePath = (
  moduleName: AwsS3FolderModuleName,
  usecaseName: AwsS3FolderModuleUseCaseName,
  fileNameWithType: string
) => {
  const relativePath = `${awsS3AccessableFolder.web}/${moduleName}/${usecaseName}/${fileNameWithType}`
  return relativePath
}

/**
 * url 访问权限由 bucket 进行配置
 * @param relativePath 上传到 S3 的相对路径
 */
const getUploadFileUrl = (relativePath: string) => {
  const { bucket, region } = awsS3Config
  const absolutePath = `https://${bucket}.S3.${region}.amazonaws.com/${relativePath}`
  return absolutePath
}

const getFileNameWithType = (file: File) => {
  const nameArr = file.name.split('.') || []
  return `${Date.now()}.${nameArr[nameArr.length - 1]}`
}

/**
 * 上传文件（视频、图片等）到 AWS S3 相应的模块和用例下
 * 前端配置的 accessKey 权限为仅支持上传
 * @param file
 * @param module
 * @param usecaseName
 * @returns
 */
export const awsS3UploadFile = (
  file: File,
  module: AwsS3FolderModuleName,
  usecaseName: AwsS3FolderModuleUseCaseName
): Promise<{ url: string }> => {
  return new Promise((resolve, reject) => {
    if (!file) reject(new Error(t`plugins_aws_s3_utils_index__7m1smvuqb`))

    const { bucket } = awsS3Config
    const filePath = getAwsS3FileRelativePath(module, usecaseName, getFileNameWithType(file))

    const putCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: filePath,
      Body: file,
      ContentType: file.type,
    })

    awsS3Client
      .send(putCommand)
      .then(() => {
        resolve({
          url: getUploadFileUrl(filePath),
        })
      })
      .catch(error => {
        console.error(error)
        reject(new Error(t`plugins_aws_s3_utils_index_r5a48liykz`))
      })
  })
}
