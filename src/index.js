const core = require("@actions/core"),
  github = require("@actions/github");
  
var inputs = {
  secret: core.getInput("token"),
};

(async (opts) => {
  try {
    let octokit = github.getOctokit(opts.secret);
    var openPRs = await octokit.pulls.list({ ...github.context.repo, state: "open" });
    openPRs.data.forEach(async (p) => {
      try {
        octokit.pulls.updateBranch({ ...github.context.repo, pull_number: p.number })
      } catch (error) {
        core.error(error);
      }
    });
  } catch (error) {
    core.setFailed(error.message);
  }
})(inputs);
