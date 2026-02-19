import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max upload limit - 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if(!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only PDF or DOCX files are allowed"));
    }
    cb(null, true);
  }
});