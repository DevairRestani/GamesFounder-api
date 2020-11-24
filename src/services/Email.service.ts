import nodeMailer from "nodemailer";

interface Params {
  destinatario: string;
  conteudo: string;
  assunto: string;
  html?: boolean;
}
interface Config {
  remetente: string;
  remetenteSenha: string;
  port: number;
  host: string;
}

export class Email {
  private Config = {
    host: "smtp.gmail.com",
    port: 587,
    remetente: "devair.juca2013@gmail.com",
    remetenteSenha: "102155545Ab.",
  };

  public async send({
    destinatario,
    assunto,
    html,
    conteudo,
  }: Params): Promise<void> {
    const account = await nodeMailer.createTestAccount();

    const transporter = nodeMailer.createTransport({
      host: this.Config.host,
      port: this.Config.port,
      secure: false,
      auth: {
        user: this.Config.remetente,
        pass: this.Config.remetenteSenha,
      },
    });

    if (html) {
      const info = await transporter.sendMail({
        from: '"Games Finder" <' + this.Config.remetente + ">",
        to: destinatario,
        subject: assunto,
        html: conteudo,
      });
    } else {
      const info = await transporter.sendMail({
        from: '"Games Finder" <' + this.Config.remetente + ">",
        to: destinatario,
        subject: assunto,
        text: conteudo,
      });

      if (!info) {
        throw new Error("Erro ao enviar o email");
      }
    }
  }
}
