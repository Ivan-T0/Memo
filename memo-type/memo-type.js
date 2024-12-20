const axios = require('axios');
const FileType = require('file-type');

module.exports = async function (data) {
    try {
        const fileUrl = data.file_url;
        if (!fileUrl) throw new Error("Missing file_url");

        const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
        const fileType = await FileType.fromBuffer(response.data);

        return {
            success: true,
            mimeType: fileType?.mime || "unknown",
            extension: fileType?.ext || "unknown"
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
