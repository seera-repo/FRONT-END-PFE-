type Props = {
  image: string;
  title: string;
  text: string;
};

function Feature({ image, title, text }: Props) {
  return (
    <div className="items-center justify-center w-[390px] h-[290px] bg-[rgba(167,170,233,0.39)] flex flex-col rounded-[20px] hover:shadow-[0px_4px_16px_rgba(0,0,0,0.2)] hover:cursor-pointer">
      <img
        className="rounded-[20px] w-[150px] h-[100px] mt-[20px]"
        src={image}
        alt={title}
      />
      <h2 className="text-[rgb(44,44,44)] w-[220px] h-[30px] text-[22px] font-[550] whitespace-nowrap mt-[10px]">{title}</h2>
      <p className="text-[rgb(90,90,90)] w-[360px] h-[120px] text-[18px] font-[300] text-center mt-[10px]">{text}</p>
    </div>
  );
}

export default Feature;