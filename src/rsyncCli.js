const { sync: commandExists } = require('command-exists');
const { get: nodeCmd } = require('node-cmd');

const validateRsync = (callback = () => {}) => {
  const rsyncCli = commandExists('rsync');
  nodeCmd.run(
        `cd ./example
ls`,
        function(err, data, stderr){
            console.log('examples dir now contains the example file along with : ',data)
        }
    );
    nodeCmd.run('echo &PATH',
            (err, data, stderr) => {
              console.log('path. \n', data, stderr);
              callback();
            }
           );
  if (!rsyncCli) {

    nodeCmd(
      'sudo apt-get --no-install-recommends install rsync',
      (err, data, stderr) => {
        if (err) {
          console.log('⚠️ [CLI] Rsync installation failed. Aborting ... ', err.message);
          process.abort();
        } else {
          console.log('✅ [CLI] Rsync installed. \n', data, stderr);
          callback();
        }
      }
    );
  } else {
    callback();
  }
};

const validateInputs = (inputs) => {
  const inputKeys = Object.keys(inputs);
  const validInputs = inputKeys.filter((inputKey) => {
    const inputValue = inputs[inputKey];

    if (!inputValue) {
      console.error(`⚠️ [INPUTS] ${inputKey} is mandatory`);
    }

    return inputValue;
  });

  if (validInputs.length !== inputKeys.length) {
    console.error('⚠️ [INPUTS] Inputs not valid, aborting ...');
    process.abort();
  }
};

module.exports = {
  validateRsync,
  validateInputs
};
