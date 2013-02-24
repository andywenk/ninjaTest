var ninjaTest = (function () {
  var self = this;
  var queue = [];
  var paused = false;
  var results;

  // public methods
  createStatusBar = function () {
    var statusBarTag = append(byId("results"), createEl("div"));
    statusBarTag.id = "status";
    append(statusBarTag, text('Status: '));
  };

  intro = function (intro) {
    var introTag = append(byId("results"), createEl("div"));
    introTag.id = "intro";
    append(introTag, text(intro));
  };

  assert = function (value, description, group) {
    var result = createResult(value, description);
    append(results, result);
    groupNodeStatus(value, result);
    setStatusBarProgress(value, group);
    return result;
  };

  test = function (name, fn) {
    queue.push(function () {
      results = byId("results");
      createGroup(name);
      fn();
    });
    runTest();
  };

  // private methods
  createGroup = function (name) {
    var groupElement = assert(true, name, true);
    results = append(groupElement, createEl("div"));
    results.className = "group";
  };

  createResult = function (value, description) {
    var resultTag = createEl("p");
    resultTag.className = result(value);
    append(resultTag, text(description));
    return resultTag;
  };

  result = function (value) {
    return value ? "pass" : "fail";
  }

  groupNodeStatus = function (value, result) {
    if(!value) {
      result.parentNode.parentNode.className = "fail";
    }
  }

  setStatusBarProgress = function (value, group) {
    if (group) return;
    var status = value ? ' . ' : ' F ';
    append(byId('status'), text(status));
  }

  pause = function () {
    paused = true;
  }

  resume = function () {
    paused = false;
    setTimeout(runTest, 1);
  }

  runTest = function () {
    if (!paused && queue.length) {
      queue.shift()();
      if (!paused) {
        resume();
      }
    }
  }

  // some helper methods / shortcuts
  byId = function (id) {
    return document.getElementById(id);
  }

  createEl = function (el) {
    return document.createElement(el);
  }

  text = function (text) {
    return document.createTextNode(text);
  }

  append = function(el, content) {
    return el.appendChild(content);
  }

  return {
    createStatusBar: createStatusBar,
    intro: intro,
    assert: assert,
    test: test
  };
}) ();
