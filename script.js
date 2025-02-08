document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("editor");
    const markdownOutput = document.getElementById("markdown-output");

    const toolbarButtons = {
        bold: document.getElementById("bold"),
        italic: document.getElementById("italic"),
        underline: document.getElementById("underline"),
        h1: document.getElementById("h1"),
        h2: document.getElementById("h2"),
        h3: document.getElementById("h3"),
        bullet: document.getElementById("bullet"),
        numbered: document.getElementById("numbered"),
        link: document.getElementById("link")
    };

    function applyFormat(command, value = null) {
        document.execCommand(command, false, value);
        editor.focus();
    }

    toolbarButtons.bold.addEventListener("click", () => applyFormat("bold"));
    toolbarButtons.italic.addEventListener("click", () => applyFormat("italic"));
    toolbarButtons.underline.addEventListener("click", () => applyFormat("underline"));
    
    toolbarButtons.h1.addEventListener("click", () => applyFormat("formatBlock", "<h1>"));
    toolbarButtons.h2.addEventListener("click", () => applyFormat("formatBlock", "<h2>"));
    toolbarButtons.h3.addEventListener("click", () => applyFormat("formatBlock", "<h3>"));

    toolbarButtons.bullet.addEventListener("click", () => applyFormat("insertUnorderedList"));
    toolbarButtons.numbered.addEventListener("click", () => applyFormat("insertOrderedList"));

    toolbarButtons.link.addEventListener("click", () => {
        const url = prompt("Nhập URL:");
        if (url) applyFormat("createLink", url);
    });

    function updateMarkdown() {
        markdownOutput.value = editor.innerHTML;
    }

    editor.addEventListener("input", updateMarkdown);
    
    document.getElementById("copy").addEventListener("click", () => {
        navigator.clipboard.writeText(markdownOutput.value);
        alert("Đã sao chép Markdown!");
    });

    document.getElementById("download").addEventListener("click", () => {
        const blob = new Blob([markdownOutput.value], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "document.md";
        a.click();
    });
});
document.getElementById("markdown-tab").addEventListener("click", function () {
    document.getElementById("markdown-section").classList.remove("hidden");
    document.getElementById("code-section").classList.add("hidden");
    this.classList.add("active");
    document.getElementById("code-tab").classList.remove("active");
});

document.getElementById("code-tab").addEventListener("click", function () {
    document.getElementById("code-section").classList.remove("hidden");
    document.getElementById("markdown-section").classList.add("hidden");
    this.classList.add("active");
    document.getElementById("markdown-tab").classList.remove("active");
})
function convertToPython() {
    let jsCode = document.getElementById("js-input").value;

    if (!jsCode.trim()) {
        alert("Vui lòng nhập code JavaScript!");
        return;
    }

    let pythonCode = jsCode
        // Xóa từ khóa khai báo biến (var, let, const)
        .replace(/\b(var|let|const)\s+/g, "")
        // Chuyển console.log thành print
        .replace(/console\.log\s*\(/g, "print(")
        // Chuyển toán tử === thành ==
        .replace(/===/g, "==")
        .replace(/!==/g, "!=")
        // Chuyển object {} thành dictionary {}
        .replace(/\{([^}]+)\}/g, (match, p1) => {
            return "{" + p1.replace(/:\s*/g, ": ").replace(/,/g, ", ") + "}";
        })
        // Chuyển array [] thành list []
        .replace(/\[(.*?)\]/g, "[$1]")
        // Xóa dấu chấm phẩy cuối dòng
        .replace(/;\s*$/gm, "")
        // Chuyển for loop từ JavaScript sang Python
        .replace(/for\s*\(\s*(let|var)?\s*(\w+)\s*=\s*(\d+)\s*;\s*\2\s*<\s*(\d+)\s*;\s*\2\+\+\s*\)/g, "for $2 in range($3, $4):")
        // Chuyển while loop
        .replace(/while\s*\((.*?)\)/g, "while $1:")
        // Chuyển function declaration sang Python
        .replace(/function\s+(\w+)\s*\((.*?)\)\s*\{/g, "def $1($2):")
        // Chuyển arrow function
        .replace(/(\w+)\s*=\s*\((.*?)\)\s*=>\s*\{/g, "def $1($2):")
        // Xóa dấu ngoặc nhọn của block code
        .replace(/\{|\}/g, "")
        // Chuyển toán tử i-- và i++ thành Python tương đương
        .replace(/(\w+)\+\+/g, "$1 += 1")
        .replace(/(\w+)--/g, "$1 -= 1");

    // Cải thiện thụt lề (Indentation)
    pythonCode = pythonCode.split("\n").map(line => {
        let indentLevel = (line.match(/^\s+/) || [""])[0].length / 4;
        return "    ".repeat(indentLevel) + line.trim();
    }).join("\n");

    document.getElementById("python-output").value = pythonCode;
}