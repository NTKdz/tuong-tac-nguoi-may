import axios from "axios";

const key = [
  "8e8798413dmshf57c00d04dfa197p1e8da5jsnaadb5e702399",
  "0917e38b6fmsh25dbcb67d26c191p1e2df3jsnc92302097b33",
  "f6b1f07fbcmshb9a187811f54d80p1a0023jsnb383338ae2de",
];

const options = {
  method: "POST",
  url: "https://realistic-text-to-speech.p.rapidapi.com/v3/generate_voice_over_v2",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": key[2],
    "X-RapidAPI-Host": "realistic-text-to-speech.p.rapidapi.com",
  },
  data: {
    voice_obj: {
      id: 2014,
      voice_id: "en-US-Neural2-A",
      gender: "Male",
      language_code: "en-US",
      language_name: "US English",
      voice_name: "John",
      status: 2,
      rank: 0,
      type: "google_tts",
      isPlaying: false,
    },
    json_data: [
      {
        block_index: 0,
        text: 'WASHINGTON: Former US vice president Mike Pence said that he would not be backing Donald Trump as his old boss runs for a second term in the White House.\n\n"It should come as no surprise that I will not be endorsing Donald Trump this year," Pence said in an interview with Fox News.\n\nADVERTISEMENT\n\nUS media called the announcement a "bombshell" and "startling," although in reality deep divisions have driven the two men apart since leaving office, and an endorsement would have been a surprise.\n\nThe pair became estranged after Trump tried to pressure Pence to help him overturn his 2020 election defeat to Joe Biden, repeatedly attacking him on social media when he wouldn\'t go along with the scheme.\n\nSPONSORED CONTENT Sabah revenue hits RM6.97 billion: Hajiji says GRS State Government may see full term Kota Kinabalu: The Sabah Government continued its momentum in managing the economy in line with the commitment and spirit of the Sabah Maju Jaya (SMJ) when it posted record high state revenue of RM6.973 billion last year. Read more After various attempts by Trump and his allies to subvert the election results failed, the then-president directed a mob of his supporters to march on the Capitol, where they ransacked the building as some chanted "Hang Mike Pence!"\n\nPence told Fox News that Trump was "pursuing and articulating an agenda that is at odds with the conservative agenda that we governed on during our four years."\n\nADVERTISEMENT\n\nThe 64-year-old\'s comments come days after Trump secured enough delegates to clinch the Republican nomination to challenge Biden in November.\n\nPence was one of Trump\'s early rivals in the primary contest ahead of the 2024 election, although he quit the race last October after failing to poll in double figures.\n\nADVERTISEMENT\n\nPence did not offer an alternative endorsement -- there are several third-party candidates running -- and said he would never vote for Biden, who secured the Democratic nomination this week.\n\nPence gave Trump years of unswervingly loyal service before the insurrection in Washington.\n\nBut he called the president\'s actions on January 6, 2021, "reckless" and said they "endangered me and my family."\n\nTrump had demanded Pence, a former governor of Indiana, to derail the congressional certification of Biden\'s electoral victory.\n\nPence refused, gaining the enmity of Trump\'s diehard followers and becoming persona non grata within the hard right "Make America Great Again" movement.\n\nThe evangelical Christian also received unwelcome headlines after leaving office over an FBI search of his home -- part of a wider Washington scandal over mishandled classified documents -- and a subpoena to testify before a federal probe into the Capitol riot, which he resisted.\n\nHe defended the record of the 2017-21 Trump administration in his Fox News interview, saying he was "incredibly proud" of its achievements.\n\n"It was a conservative record that made America more prosperous, more secure, and saw conservatives appointed to our courts in a more peaceful world," he said.\n\n"But that being said, during my presidential campaign I made clear there were profound differences between me and President Trump on a range of issues."\n\nStay up-to-date by following Daily Express\'s Telegram channel.\n\nDaily Express Malaysia\n\n* Follow us on Instagram and join our Telegram and/or WhatsApp channel(s) for the latest news you don\'t want to miss.\n\n* Do you have access to the Daily Express e-paper and online exclusive news? Check out subscription plans available.',
      },
    ],
  },
};

async function fetchData() {
  try {
    const response = await axios.request(options);
    const data: {
      link: string;
      block_index: number;
      duration: number;
      size: number;
    } = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();

// // Function to download and save the MP3 file
// async function downloadMP3(link, filePath) {
//   try {
//     const response = await axios.get(link, { responseType: "arraybuffer" });
//     // Write the array buffer to the existing file, overriding its content
//     if (response.status === 200) {
//       await fs.writeFile(filePath, new Uint8Array(response.data), {
//         flag: "w",
//       });
//       console.log(`MP3 file downloaded and saved as ${filePath}`);
//     }
//   } catch (error) {
//     console.error("Error downloading MP3 file:", error);
//   }
// }

// // The array containing the MP3 file information
// const mp3Files = [
//   {
//     link: "https://s3.us-east-1.amazonaws.com/invideo-uploads-us-east-1/speechen-US-Neural2-A17141961362460.mp3",
//     block_index: 0,
//     duration: 223.224,
//     size: 892896,
//   },
// ];

// // Iterate through the array and download each MP3 file
// mp3Files.forEach(async (mp3) => {
//   const filePath = "src/mockdata/audio2.mp3"; // Path to the existing file
//   await downloadMP3(mp3.link, filePath);
// });
