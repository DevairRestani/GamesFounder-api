import emailValidator from "email-validator";
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
  private Config: {
    remetente: string;
    remetenteSenha: string;
    port: number;
    host: string;
  };

  constructor(config?: Config) {
    if (config) {
      if (!emailValidator.validate(config.remetente)) {
        throw new Error("Email invalido");
      }
      this.Config = config;
      return;
    }

    this.Config.host = "smtp.gmail.com";
    this.Config.port = 587;
    this.Config.remetente = "gamefinderoficial@gmail.com";
    this.Config.remetenteSenha =
      "dLSVegidim75B072VLUsjSP@9l^L4dgv@!cKj0bsE%M5^@fc&g";
  }

  public async send({
    destinatario,
    assunto,
    html,
    conteudo,
  }: Params): Promise<void> {
    if (!emailValidator.validate(destinatario)) {
      throw new Error("Email invalido");
    }

    const account = await nodeMailer.createTestAccount();

    const transporter = await nodeMailer.createTransport({
      host: this.Config.host,
      port: this.Config.port,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass,
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
