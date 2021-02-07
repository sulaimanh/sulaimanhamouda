import {
  anchor as A,
  headingSecondary as H2,
  headingQuaternary as H4,
  paragraph as P
} from "@/components/text/text";

import Button from "@/components/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Support({ children }) {
  return (
    <div className=' flex-row max-h-full'>
      <H2>Support journeythrough</H2>
      <hr className='my-4'></hr>
      <P>
        Everyone who works on the construction of <b>journeythrough</b>, works
        for <b>free</b>. Muslims are integral members of society, having
        experiences and knowledge in many fields, such as Islam, Engineering,
        Science, Entrepreneurship, and much more. <b>journeythrough</b> brings
        all of these Muslim professionals on one platform in order for them to
        share their knowledge with the rest of us.
      </P>

      <br />

      <H4 className='mb-2'>Support journeythrough</H4>
      <P>
        If you are a reader of <b>journeythrough</b>, then please consider
        donating. All extra costs come out of pocket from the team of
        journeythrough. We have spent a lot of extra time and money on this
        project and would greatly appreciate any donations. All proceeds will go
        towards supporting infrastructure, developers, and writers.
      </P>

      <br />

      <H4 className='mb-2'>Contribute</H4>
      <P>
        <b>journeythrough</b> is continuously under construction. Currently, we
        only have one developer, who is working for free. If you are a
        developer/designer who wants to contribute to this site, please consider
        joining our Slack. We are also looking for writers to share their
        knowledge on <b>journeythrough</b>.
      </P>

      <div className='flex justify-center mt-16'>
        <Button
          className='w-6/12 mr-5'
          textColor='support'
          hoverTextColor='white'
          borderColor='support'
          hoverBorderColor='support'
          color='white'
          hoverColor='support'
        >
          Join Slack
        </Button>
        <Button
          className='w-6/12 hover:opacity-90'
          textColor='white'
          hoverTextColor='white'
          borderColor='support'
          hoverBorderColor='support'
          color='support'
          hoverColor='support'
        >
          Donate
        </Button>
      </div>
    </div>
  );
}
