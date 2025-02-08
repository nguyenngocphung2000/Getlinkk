document.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("editor");
    const buttons = document.querySelectorAll(".toolbar button");
    const markdownOutput = document.getElementById("markdown-output");

    function convertToMarkdown() {
        let html = editor.innerHTML;

        html = html.replace(/<h1>(.*?)<\/h1>/g, "# $1\n");
        html = html.replace(/<h2>(.*?)<\/h2>/g, "## $1\n");
        html = html.replace(/<h3>(.*?)<\/h3>/g, "### $1\n");

        html = html.replace(/<b>(.*?)<\/b>/g, "**$1**");
        html = html.replace(/<i>(.*?)<\/i>/g, "_$1_");

        html = html.replace(/<ul>(.*?)<\/ul>/gs, match =>
            match.replace(/<li>(.*?)<\/li>/g, "- $1\n")
        );
        html = html.replace(/<ol>(.*?)<\/ol>/gs, match =>
            match.replace(/<li>(.*?)<\/li>/g, (item, content, index) => `${index + 1}. ${content}\n`)
        );

        markdownOutput.value = html.trim();
    }

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const command = this.getAttribute("data-command");
            const value = this.getAttribute("data-value");

            editor.focus(); 

            if (command === "formatBlock") {
                document.execCommand("formatBlock", false, value);
            } else {
                document.execCommand(command, false, null);
            }

            convertToMarkdown();
        });
    });

    editor.addEventListener("input", convertToMarkdown);
});
