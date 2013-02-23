window.onload = function () {
  intro = "This is a intro for the tests";
  ninjaTest.intro(intro);

  ninjaTest.createStatusBar();

  ninjaTest.test("Testset A", function () {
    assert(true, "First assertion true");
    assert(false, "Second assertion false");
  });

  ninjaTest.test("Testset B", function () {
    assert(true, "Third assertion true");
    assert(true, "Fourth assertion true");
  });

  ninjaTest.test("Testset C", function () {
    assert(10 > 5, "Test if 10 is greater than 5");
    assert(wordLengthTest('Hannebambel'), "Test if a given word is not bigger than ten characters");
  });

  ninjaTest.test("Asynchronous Test A", function () {
    pause();
    setTimeout(function () {
      assert(true, "First async test is true");
      resume();
    }, 1000);
  });

  ninjaTest.test("Asynchronous Test B", function () {
    pause();
    setTimeout(function () {
      assert(false, "Second async test is false");
      resume();
    }, 2000);
  });

  function wordLengthTest(word) {
    return word.length <= 10 ? true : false;
  }
}
