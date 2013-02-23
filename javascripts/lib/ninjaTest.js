var ninjaTest = function () {
  var self = this;
  self.queue = [];
  self.paused = false;
  self.results;

  // public methods
  self.createStatusBar = function () {
    var statusBarTag = self.append(self.byId("results"), self.createEl("div"));
    statusBarTag.id = "status";
    self.append(statusBarTag, self.text('Status: '));
  };

  self.intro = function (intro) {
    var introTag = self.append(self.byId("results"), self.createEl("div"));
    introTag.id = "intro";
    self.append(introTag, self.text(intro));
  };

  self.assert = function (value, description, group) {
    var result = self.createResult(value, description);
    self.append(results, result);
    self.groupNodeStatus(value, result);
    self.setStatusBarProgress(value, group);
    return result;
  };

  self.test = function (name, fn) {
    self.queue.push(function () {
      self.results = self.byId("results");
      self.createGroup(name);
      fn();
    });
    self.runTest();
  };

  // private methods
  self.createGroup = function (name) {
    var groupElement = self.assert(true, name, true);
    self.results = self.append(groupElement, self.createEl("div"));
    self.results.className = "group";
  };

  self.createResult = function (value, description) {
    var resultTag = self.createEl("p");
    resultTag.className = self.result(value);
    self.append(resultTag, self.text(description));
    return resultTag;
  };

  self.result = function (value) {
    return value ? "pass" : "fail";
  }

  self.groupNodeStatus = function (value, result) {
    if(!value) {
      result.parentNode.parentNode.className = "fail";
    }
  }

  self.setStatusBarProgress = function (value, group) {
    if (group) return;
    var status = value ? ' . ' : ' F ';
    self.append(self.byId('status'), self.text(status));
  }

  self.pause = function () {
    self.paused = true;
  }

  self.resume = function () {
    self.paused = false;
    setTimeout(self.runTest, 1);
  }

  self.runTest = function () {
    if (!self.paused && self.queue.length) {
      self.queue.shift()();
      if (!self.paused) {
        self.resume();
      }
    }
  }

  // some helper methods / shortcuts
  self.byId = function (id) {
    return document.getElementById(id);
  }

  self.createEl = function (el) {
    return document.createElement(el);
  }

  self.text = function (text) {
    return document.createTextNode(text);
  }

  self.append = function(el, content) {
    return el.appendChild(content);
  }

  return {
    createStatusBar: self.createStatusBar,
    intro: self.intro,
    assert: self.assert,
    test: self.test
  };
} ();
