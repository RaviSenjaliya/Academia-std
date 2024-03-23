import './Speech.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Tooltip } from '@mui/material';

const SpeechForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <div className="container">
        <div className="row mb-2">
          <div className="col-sm-4 mb-2">
            <Button onClick={startListening} color="primary" variant="contained" type="submit" fullWidth>
              <span>Start Listening</span>
            </Button>
          </div>

          <div className="col-sm-4 mb-2">
            <Button
              onClick={SpeechRecognition.stopListening}
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
            >
              <span>Stop Listening</span>
            </Button>
          </div>
          <div className="col-sm-2 mb-2">
            <Tooltip title={isVisible ? 'copied' : 'Click to copy'} placement="top">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(transcript);
                  setIsVisible(!isVisible);
                }}
                color="primary"
                variant="outlined"
                type="submit"
                fullWidth
              >
                <span>
                  <ContentCopyIcon />
                </span>
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="main-content">{transcript}</div>
      </div>
    </>
  );
};

export default SpeechForm;
