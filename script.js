document.addEventListener("DOMContentLoaded", () => {
const editor = document.getElementById("editor");
    const buttons = document.querySelectorAll(".toolbar button");
const markdownOutput = document.getElementById("markdown-output");
    const copyBtn = document.getElementById("copyBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    // Chuyển đổi nội dung HTML sang Markdown
    function convertToMarkdown() {
        let html = editor.innerHTML;

        html = html.replace(/<h1>(.*?)<\/h1>/g, "# $1\n");
        html = html.replace(/<h2>(.*?)<\/h2>/g, "## $1\n");
        html = html.replace(/<h3>(.*?)<\/h3>/g, "### $1\n");
        html = html.replace(/<b>(.*?)<\/b>/g, "**$1**");
        html = html.replace(/<i>(.*?)<\/i>/g, "_$1_");
        html = html.replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)");

        html = html.replace(/<ul>(.*?)<\/ul>/gs, match =>
            match.replace(/<li>(.*?)<\/li>/g, "- $1\n")
        );
        html = html.replace(/<ol>(.*?)<\/ol>/gs, match =>
            match.replace(/<li>(.*?)<\/li>/g, (item, content, index) => `${index + 1}. ${content}\n`)
        );

        markdownOutput.value = html.trim();
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

    // Xử lý khi nhấn nút công cụ
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const command = this.getAttribute("data-command");
            const value = this.getAttribute("data-value");

            editor.focus(); // Giữ focus
    toolbarButtons.bold.addEventListener("click", () => applyFormat("bold"));
    toolbarButtons.italic.addEventListener("click", () => applyFormat("italic"));
    toolbarButtons.underline.addEventListener("click", () => applyFormat("underline"));
    
    toolbarButtons.h1.addEventListener("click", () => applyFormat("formatBlock", "<h1>"));
    toolbarButtons.h2.addEventListener("click", () => applyFormat("formatBlock", "<h2>"));
    toolbarButtons.h3.addEventListener("click", () => applyFormat("formatBlock", "<h3>"));

            if (command === "formatBlock") {
                document.execCommand("formatBlock", false, value);
            } else if (command === "createLink") {
                let url = prompt("Nhập URL:");
                if (url) document.execCommand("createLink", false, url);
            } else {
                document.execCommand(command, false, null);
            }
    toolbarButtons.bullet.addEventListener("click", () => applyFormat("insertUnorderedList"));
    toolbarButtons.numbered.addEventListener("click", () => applyFormat("insertOrderedList"));

            convertToMarkdown();
        });
    toolbarButtons.link.addEventListener("click", () => {
        const url = prompt("Nhập URL:");
        if (url) applyFormat("createLink", url);
});

    // Sao chép Markdown
    copyBtn.addEventListener("click", () => {
        markdownOutput.select();
        document.execCommand("copy");
        alert("Markdown đã được sao chép!");
    function updateMarkdown() {
        markdownOutput.value = editor.innerHTML;
    }

    editor.addEventListener("input", updateMarkdown);
    
    document.getElementById("copy").addEventListener("click", () => {
        navigator.clipboard.writeText(markdownOutput.value);
        alert("Đã sao chép Markdown!");
});

    // Tải xuống Markdown
    downloadBtn.addEventListener("click", () => {
        const blob = new Blob([markdownOutput.value], { type: "text/markdown" });
    document.getElementById("download").addEventListener("click", () => {
        const blob = new Blob([markdownOutput.value], { type: "text/plain" });
const a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "document.md";
a.click();
});

    // Cập nhật Markdown khi nhập nội dung
    editor.addEventListener("input", convertToMarkdown);
});