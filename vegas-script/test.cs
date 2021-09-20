using System;
using System.Xml;
using System.Windows.Forms;
using System.Drawing;
using ScriptPortal.Vegas;

/* Effect names
 * Text TextColor collection AnimationName Scale Location Alignment AdvancedGroup Background Tracking LineSpacing OutlineGroup OutlineWidth OutlineColor
 * ShadowGroup ShadowEnable ShadowColor ShadowOffsetX ShadowOffsetY ShadowBlur Controls
 */

public class CaptionCreator {
    private Vegas vegas;

    public CaptionCreator(Vegas _vegas) {
        this.vegas = _vegas;
    }

    public void Run() {
        foreach (Track track in vegas.Project.Tracks) {
            if (track.Selected) {
                PlugInNode generator = vegas.Generators.GetChildByName("VEGAS Titles & Text");
                var media = new Media(generator);
                var stream = media.Streams[0];

                var newEvent = new VideoEvent(new Timecode("00:00:00:10"), new Timecode("00:00:00:50"));
                track.Events.Add(newEvent);

                OFXEffect effect = media.Generator.OFXEffect;

                OFXStringParameter text = (OFXStringParameter)effect["Text"];
                text.Value = GetTextValue("Lol kek");
                OFXRGBAParameter color = (OFXRGBAParameter)effect["TextColor"];
                color.Value = new OFXColor(1, 0, 0, 1);

                effect.AllParametersChanged();

                var take = new Take(stream);
                newEvent.Takes.Add(take);
            }
        }

        return;
        foreach (Track track in vegas.Project.Tracks) {
            if (track.Selected) {
                PlugInNode generator = vegas.Generators.GetChildByName("VEGAS Titles & Text");
                var media = new Media(generator);

                var a = 5;

                var stream = media.Streams[0];

                var newEvent = new VideoEvent(new Timecode("00:00:00:10"), new Timecode("00:00:00:50"));

                track.Events.Add(newEvent);

                OFXEffect effect = media.Generator.OFXEffect;

                OFXStringParameter text = (OFXStringParameter)effect["Text"];
                MessageBox.Show(text.Value);
                text.Value = GetTextValue("Lol kek");
                MessageBox.Show(text.Value);
                OFXRGBAParameter color = (OFXRGBAParameter)effect["TextColor"];
                MessageBox.Show(color.Value.R + " " + color.Value.G + " " + color.Value.B + " " + color.Value.A);
                color.Value = new OFXColor(1, 0, 0, 1);
                MessageBox.Show(color.Value.R + " " + color.Value.G + " " + color.Value.B + " " + color.Value.A);

                effect.AllParametersChanged();


                // OFXStringParameter text = effect.FindParameterByName("Text") as OFXStringParameter;

                // XmlDocument textValDoc = new XmlDocument();
                // textValDoc.LoadXml("<OfxParamValue>" + text.Value + "</OfxParamValue>");

                // XmlNode textPValue = textValDoc.FirstChild;

                // text.Value = text.Value.Replace("SAMPLE TEXT", "Test text");
                // text.ParameterChanged();

                var take = new Take(stream);
                newEvent.Takes.Add(take);



                // var names = new string[] { "Text", "TextColor", "Location", "Alignment", "OutlineGroup", "OutlineWidth", "OutlineColor", "Controls" };
                // foreach (var name in names) {
                //     try {
                //         OFXStringParameter par = effect.FindParameterByName(name) as OFXStringParameter;
                //         MessageBox.Show(name + ": " + par.Value);
                //     } catch {
                //         MessageBox.Show(name + ": error");
                //     }
                // }

                String names = "Names & Types:\n";
                foreach (var par in effect.Parameters) {
                    names += (par.Name + " (" + par.ParameterType.ToString() + ")");
                }

                MessageBox.Show(names);

                // MessageBox.Show(names);
                // MessageBox.Show(labels);
                // MessageBox.Show(text.Value);
                // MessageBox.Show(text.Value.Replace("SAMPLE TEXT", "Test text"));
            }
        }
    }

    private String GetTextValue(String text, int fontSize = 22, String font = "Calibri") {
        return (
            "{" +
                "\\rtf1\\ansi\\ansicpg1252\\deff0{" + 
                    "\\fonttbl{" + 
                        "\\f0\\fnil\\fcharset0 " + font + ";" +
                    "}" + 
                "}" + 
                "\\viewkind4\\uc1\\pard\\lang1033\\f0\\fs" + (fontSize * 2) + " " + text + "\\par" +
            "}"
        );
    }
}

public partial class ScriptInputForm : Form {
    private Vegas vegas;
    private System.ComponentModel.IContainer components = null;

    public ScriptInputForm(Vegas _vegas) {
        this.vegas = _vegas;
        InitializeComponent();
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing && (components != null))
        {
            components.Dispose();
        }
        base.Dispose(disposing);
    }

    private void InitializeComponent() {
        this.components = new System.ComponentModel.Container();
        this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
        this.ClientSize = new System.Drawing.Size(800, 450);

        this.Text = "Select caption configuration";

        this.FormBorderStyle = FormBorderStyle.FixedDialog;
        this.MaximizeBox = false;
        this.MinimizeBox = false;
        this.StartPosition = FormStartPosition.CenterScreen;

        var browseButton = new Button();
        browseButton.Text = "Browse";
        browseButton.Click += new System.EventHandler(this.OnBrowseClick);
        browseButton.Location = new Point(10, 10);

        this.Controls.Add(browseButton);
    }

    private void OnBrowseClick(object sender, EventArgs eventArgs) {
        MessageBox.Show("Yes!");
        OnConfigurationSelected();
    }

    private void OnConfigurationSelected() {
        var captionCreator = new CaptionCreator(vegas);
        captionCreator.Run();
    }
}

public class EntryPoint {
    public void FromVegas(Vegas vegas) {
        var form = new ScriptInputForm(vegas);
        form.ShowDialog();
    }
}
