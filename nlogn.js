function submitForm(event) {
  event.preventDefault();
  analyzeCode();
  $(".result").show();
}

function analyzeCode() {
  var code = document.getElementById("codeTextarea").value;

  var ast = parseCode(code);

  var forLoopCount = countLoops(ast, "ForStatement");
  var whileLoopCount = countLoops(ast, "WhileStatement");
  var functionCallCount = countFunctionCalls(ast);
  var ifConditionCount = countConditions(ast, "IfStatement");
  var elseConditionCount = countConditions(ast, "ElseStatement");

  var timeComplexity = calculateTimeComplexity(
    forLoopCount,
    whileLoopCount,
    functionCallCount,
    ifConditionCount,
    elseConditionCount
  );
  var auxiliarySpace = calculateAuxiliarySpace(
    forLoopCount,
    whileLoopCount,
    functionCallCount,
    ifConditionCount,
    elseConditionCount
  );

  document.getElementById("timeComplexity").value = determineTimeComplexity(
    timeComplexity,
    ast
  );
  document.getElementById("auxiliarySpace").value =
    determineSpaceComplexity(auxiliarySpace);
}

function checkNLogN(ast) {
  // Check for patterns indicative of n*log(n) complexity
  var isNLogN = false;

  var loops = ast.body.filter(
    (node) => node.type === "ForStatement" || node.type === "WhileStatement"
  );
  for (var i = 0; i < loops.length; i++) {
    var loopBody = loops[i].body;
    if (loopBody && loopBody.type === "BlockStatement") {
      var loopStatements = loopBody.body;
      for (var j = 0; j < loopStatements.length; j++) {
        var statement = loopStatements[j];
        if (statement.type === "ExpressionStatement" && statement.expression) {
          var expression = statement.expression;
          if (
            expression.type === "UpdateExpression" &&
            expression.operator === "++" &&
            expression.argument.type === "Identifier"
          ) {
            var loopVariable = expression.argument.name;
            // Check if the loop variable is also multiplied or divided by 2
            if (
              loopStatements.find(
                (s) =>
                  s.type === "ExpressionStatement" &&
                  s.expression &&
                  s.expression.type === "AssignmentExpression" &&
                  (s.expression.operator === "*" ||
                    s.expression.operator === "/") &&
                  s.expression.left.type === "Identifier" &&
                  s.expression.left.name === loopVariable &&
                  s.expression.right.type === "Literal" &&
                  s.expression.right.value === 2
              )
            ) {
              isNLogN = true;
              break;
            }
          }
        }
      }
    }
  }

  return isNLogN;
}

function determineTimeComplexity(value, ast) {
  if (value === 0) {
    return "O(1)";
  } else if (checkNLogN(ast)) {
    return "O(n log n)";
  } else if (value <= 10) {
    return "O(n)";
  } else if (value <= 20) {
    return "O(n^2)";
  } else if (value <= 50) {
    return "O(log n)";
  } else if (value <= 200) {
    return "O(n^n)";
  } else {
    return "O(∞)";
  }
}

// Your existing functions...

function parseCode(code) {
  // Implement your code parsing logic here
  // For simplicity, let's assume you have a parseCode function available
  return parseCode(code);
}

function countLoops(ast, loopType) {
  // Implement your countLoops function here
  // For simplicity, let's assume you have a countLoops function available
  return countLoops(ast, loopType);
}

function countFunctionCalls(ast) {
  // Implement your countFunctionCalls function here
  // For simplicity, let's assume you have a countFunctionCalls function available
  return countFunctionCalls(ast);
}

function countConditions(ast, conditionType) {
  // Implement your countConditions function here
  // For simplicity, let's assume you have a countConditions function available
  return countConditions(ast, conditionType);
}

function calculateTimeComplexity(
  forLoops,
  whileLoops,
  functionCalls,
  ifConditions,
  elseConditions
) {
  // Implement your calculateTimeComplexity function here
  return (
    forLoops * 2 +
    whileLoops * 3 +
    functionCalls * 2 +
    ifConditions +
    elseConditions
  );
}

function calculateAuxiliarySpace(
  forLoops,
  whileLoops,
  functionCalls,
  ifConditions,
  elseConditions
) {
  // Implement your calculateAuxiliarySpace function here
  return forLoops + whileLoops + functionCalls + ifConditions + elseConditions;
}

function determineSpaceComplexity(value) {
  // No space complexity analysis in this simplified version
  return "O(1)";
}
