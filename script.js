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
    }

    // Xử lý khi nhấn nút công cụ
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const command = this.getAttribute("data-command");
            const value = this.getAttribute("data-value");

            editor.focus(); // Giữ focus

            if (command === "formatBlock") {
                document.execCommand("formatBlock", false, value);
            } else if (command === "createLink") {
                let url = prompt("Nhập URL:");
                if (url) document.execCommand("createLink", false, url);
            } else {
                document.execCommand(command, false, null);
            }

            convertToMarkdown();
        });
    });

    // Sao chép Markdown
    copyBtn.addEventListener("click", () => {
        markdownOutput.select();
        document.execCommand("copy");
        alert("✅ Markdown đã được sao chép!");
    });

    // Tải xuống Markdown
    downloadBtn.addEventListener("click", () => {
        const blob = new Blob([markdownOutput.value], { type: "text/markdown" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "document.md";
        a.click();
    });

    // Cập nhật Markdown khi nhập nội dung
    editor.addEventListener("input", convertToMarkdown);
});